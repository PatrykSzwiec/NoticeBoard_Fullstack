const server = require('../../../server'); // Adjust the path to your Express app file
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../../models/user.model'); // Adjust the path to your User model file
const fs = require('fs');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('User API - Register, Login, getUser, and Logout', () => {
  // Clean up the test data before starting the tests
  before(async () => {
    // Delete any existing 'testuser' from the database
    await User.deleteOne({ login: 'testuser' });
  });

  // Test user registration
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const avatarPath = 'public/uploads/test.jpg';

      const res = await request(server)
        .post('/auth/register')
        .field('login', 'testuser')
        .field('password', 'testpassword')
        .attach('avatar',  fs.readFileSync(avatarPath), 'test.jpg');

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('User created testuser');
    });
  });

  // Test user login
  describe('POST /auth/login', () => {
    it('should log in the registered user', async () => {
      const res = await request(server)
        .post('/auth/login')
        .send({ login: 'testuser', password: 'testpassword' });

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('User logged testuser');
    });

    it('should return an error for incorrect login credentials', async () => {
      const res = await request(server)
        .post('/auth/login')
        .send({ login: 'testuser', password: 'wrongpassword' });

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Login or password are incorrect');
    });
  });

  // Test getUser
  describe('GET /auth/user', () => {
    it('should return user information for an authenticated user', async () => {
      const agent = chai.request.agent(server);

      // Log in the user
      await agent.post('/auth/login').send({ login: 'testuser', password: 'testpassword' });

      const res = await agent.get('/auth/user');

      expect(res.status).to.equal(200);
      expect(res.body.login).to.equal('testuser');

      // Close the agent to clear the session
      agent.close();
    });

    it('should return an error for an unauthenticated user', async () => {
      const res = await request(server).get('/auth/user');

      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('You are not authorized');
    });
  });

  // Test user logout
  describe('DELETE /auth/logout', () => {
    it('should log out the user', async () => {
      const agent = chai.request.agent(server);

      // Log in the user
      await agent.post('/auth/login').send({ login: 'testuser', password: 'testpassword' });

      const res = await agent.delete('/auth/logout');

      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Yeah, You've just logged out");

      // Close the agent to clear the session
      agent.close();
    });
  });
});