const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const db = require('../data/database');

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAll() {
    const posts = await db.getDb().collection('posts').find().toArray();
    return posts;
  }

  async fetchSingle() {
      if (!this.id) {
          return;
      }
      const result = await db.getDb().collection('posts').findOne({ _id: this.id });
      this.title = result.title;
      this.content = result.content;
  }

  async save() {
    const result = await db.getDb().collection('posts').insertOne({
      title: this.title,
      content: this.content,
    });

    return result;
  }

  async updateOne() {
    const result = await db
      .getDb()
      .collection('posts')
      .updateOne(
        { _id: this.id },
        { $set: { title: this.title, content: this.content } }
      );

    return result;
  }

  async deleteOne() {
    if (!this.id) {
      return;
    }
    const result = await db
      .getDb()
      .collection('posts')
      .deleteOne({ _id: this.id });
    return result;
  }
}

module.exports = Post;
