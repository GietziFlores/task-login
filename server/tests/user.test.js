import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import User from '../models/User.js';

let mongoServer;
let server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Start server on a test port
  server = app.listen(0);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('User API', () => {
  let adminToken;
  let userToken;
  let adminId;
  let userId;

  beforeEach(async () => {
    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    await admin.save();
    adminId = admin._id;

    // Create regular user
    const user = new User({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });
    await user.save();
    userId = user._id;

    // Login as admin
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'password123'
      });
    adminToken = adminLogin.body.token;

    // Login as user
    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'password123'
      });
    userToken = userLogin.body.token;
  });

  describe('GET /api/users', () => {
    it('should get all users as admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('email');
      expect(res.body[0]).toHaveProperty('role');
    });

    it('should not allow regular user to get all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get user by id as admin', async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Regular User');
      expect(res.body.email).toBe('user@example.com');
      expect(res.body.role).toBe('user');
    });

    it('should not allow regular user to get another user profile', async () => {
      const res = await request(app)
        .get(`/api/users/${adminId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
    });
  });

  describe('PUT /api/auth/profile', () => {
    it('should allow user to update their own profile', async () => {
      const updateData = {
        name: 'My Updated Name',
        workArea: 'Development',
        description: 'I am a developer'
      };

      const res = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updateData.name);
      expect(res.body.workArea).toBe(updateData.workArea);
      expect(res.body.description).toBe(updateData.description);
    });

    it('should not allow user to update role through profile endpoint', async () => {
      const updateData = {
        name: 'Updated Name',
        role: 'admin'
      };

      const res = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      // Role should remain unchanged
      expect(res.body.role).toBe('user');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user as admin', async () => {
      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');

      // Verify user is deleted
      const deletedUser = await User.findById(userId);
      expect(deletedUser).toBeNull();
    });

    it('should not allow user to delete another user', async () => {
      const res = await request(app)
        .delete(`/api/users/${adminId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
    });
  });
});