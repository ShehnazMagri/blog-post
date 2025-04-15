import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(data: Partial<Blog>): Promise<Blog> {
    const newPost = new this.blogModel(data);
    return newPost.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog)
      throw new NotFoundException(`Blog post with id "${id}" not found`);
    return blog;
  }

  async update(id: string, data: Partial<Blog>): Promise<Blog> {
    const updated = await this.blogModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated)
      throw new NotFoundException(`Blog post with id "${id}" not found`);
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.blogModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new NotFoundException(`Blog post with id "${id}" not found`);
    return { message: 'Blog post deleted successfully' };
  }
}
