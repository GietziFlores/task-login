import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

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
  await Task.deleteMany({});
});

describe('Task API', () => {
  let token;
  let adminToken;
  let userId;
  let adminId;

beforeEach(async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
  
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
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user'
  });
  await user.save();
  userId = user._id;

  // Login as user
  const userLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });
  token = userLogin.body.token;

  // Login as admin
  const adminLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'password123'
    });
  adminToken = adminLogin.body.token;
});

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'This is a test task'
      };

      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(taskData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe(taskData.title);
      expect(res.body.description).toBe(taskData.description);
      expect(res.body.completed).toBe(false);
      expect(res.body.user.toString()).toBe(userId.toString());
    });

    it('should not create task without title', async () => {
      const taskData = {
        description: 'This is a test task',
        status: 'pending'
      };

      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(taskData);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      // Create test tasks
      await Task.create([
        {
          title: 'Task 1',
          description: 'Description 1',
          completed: false,
          user: userId
        },
        {
          title: 'Task 2',
          description: 'Description 2',
          completed: true,
          user: userId
        }
      ]);
    });

    it('should get all tasks for the user', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      // Check that we have one completed and one not completed
      const completedTasks = res.body.filter(task => task.completed);
      const pendingTasks = res.body.filter(task => !task.completed);
      expect(completedTasks.length).toBe(1);
      expect(pendingTasks.length).toBe(1);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const task = new Task({
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        user: userId
      });
      await task.save();
      taskId = task._id;
    });

    it('should update a task', async () => {
      const updateData = {
        title: 'Updated Task',
        completed: true
      };

      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(updateData.title);
      expect(res.body.completed).toBe(updateData.completed);
    });

    it('should assign task to another user', async () => {
      // Create another user
      const assignee = new User({
        name: 'Assignee User',
        email: 'assignee@example.com',
        password: 'password123',
        role: 'user'
      });
      await assignee.save();

      const updateData = {
        assignee: assignee._id
      };

      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.assignee).toBe(assignee._id.toString());
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const task = new Task({
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        user: userId
      });
      await task.save();
      taskId = task._id;
    });

    it('should delete a task', async () => {
      const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');

      // Verify task is deleted
      const deletedTask = await Task.findById(taskId);
      expect(deletedTask).toBeNull();
    });
  });
});