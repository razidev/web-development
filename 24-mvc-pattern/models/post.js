const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const db = require("../data/database");

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
        this.id = new ObjectId(id);
    }
  }

  async save() {
    const result = await db.getDb().collection("posts").insertOne({
      title: this.title,
      content: this.content,
    });

    return result;
  }

  async updateOne() {
    const result = await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: this.id },
        { $set: { title: this.title, content: this.content } }
      );

    return result;
  }

  async deleteOne() {
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });
    return result;
  }
}

module.exports = Post;
