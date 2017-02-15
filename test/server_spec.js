/* eslint-env mocha */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createServer } from '../server';

chai.use(chaiHttp);

import fakeDB from '../server/fakeDB';

const server = createServer({
  nodeEnv: 'test',
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  timeout: 29000,
});

describe('API', () => {
  it('should list ALL posts on api/v0/posts GET', (done) => {
    chai.request(server)
      .get('/api/v0/posts')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.text).to.be.an('string');
        expect(res.text).to.equal(JSON.stringify(fakeDB));
        done();
      });
  });

  it('should list ONE post on api/v0/posts/:slug GET', (done) => {
    const post = {
      id: '128sd04d',
      tags: ['Design', 'Front end', 'Back end', 'UX'],
      title: 'Save for something.',
      slug: 'sparebank1-savings-calculator',
      subtitle: 'Savings calculator developed for Sparebank1 in Norway',
      picture: '/media/sparebank1-sparkalkulator.jpg',
      client: 'Sparebank1',
      description: '',
    };

    chai.request(server)
      .get(`/api/v0/posts/${post.slug}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.text).to.be.an('string');
        expect(res.text).to.equal(JSON.stringify(post));
        done();
      });
  });
});
