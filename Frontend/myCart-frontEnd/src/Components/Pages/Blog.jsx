import React from 'react';
import {Link} from 'react-router';

import Blogs from './../../Blogs.json';

import blog1 from './../../assets/images/blog-1.jpeg';
import blog2 from './../../assets/images/blog-2.jpeg';
import blog3 from './../../assets/images/blog-3.jpeg';
import blog4 from './../../assets/images/blog-4.jpeg';
import blog5 from './../../assets/images/blog-5.jpeg';

const Blog = () => {
  return (
    <>
      <div className="Page-section mb-5 text-center">
          <p className='text-muted'> <Link to='/'>Home</Link> / Blog </p>  
          <h2 className='fw-bold'> Blogs </h2>
      </div>      
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-9 blog-wrapper">
            <div className="row">
                {Blogs.map((blog) => (
                  <div className="col-lg-6" key={blog.id}>
                    <div className='blog-card overflow-hidden mb-4'>
                      <div className="blog-img overflow-hidden rounded">
                        <img src={blog.image} className='img-fluid rounded ' alt={blog.title} />
                      </div>
                      <div className='blog-content mt-3'>
                          <h6>
                            {blog.categories.map((cat, i) => (
                              <span key={i}>
                                {cat}
                                {i < blog.categories.length - 1 ? ' | ' : ''}
                              </span>
                            ))}
                          </h6>
                          <h1 className="mt-2">{blog.title}</h1>
                          <h5>
                            {blog.date} <span className='dot'>.</span> <span>by {blog.author}</span>
                          </h5>
                          <p>{blog.pera}</p>
                          <a className="blog-btn">
                            Read More <i className="ri-arrow-right-long-line"></i>
                          </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-lg-3 blog-sidebar">
            {/* Recent Posts */}
            <div className="blog-side-box border rounded p-2 post-hide">
              <div className="border-bottom pb-2">Recent Posts</div>
              {/* blog box 1 */}
              <div className="blog-post-box d-flex gap-2">
                <div className="blog-post-img">
                  <img src={blog1} className='img-fluid' alt="" />
                </div>
                <div className="blog-post-text">
                  <p>How to Write a Blog Post Your Readers Will Love in 5 steps</p>
                </div>
              </div>
              {/* blog box 2 */}
              <div className="blog-post-box d-flex gap-2">
                <div className="blog-post-img">
                  <img src={blog2} className='img-fluid' alt="" />
                </div>
                <div className="blog-post-text">
                  <p>9 Content Marketing Trends and Ideas to Increase Traffic</p>
                </div>
              </div>
              {/* blog box 3 */}
              <div className="blog-post-box d-flex gap-2">
                <div className="blog-post-img">
                  <img src={blog3} className='img-fluid' alt="" />
                </div>
                <div className="blog-post-text">
                  <p>The Ultimate Guide to Marketing Strategies</p>
                </div>
              </div>
              {/* blog box 4 */}
              <div className="blog-post-box d-flex gap-2">
                <div className="blog-post-img">
                  <img src={blog4} className='img-fluid' alt="" />
                </div>
                <div className="blog-post-text">
                  <p>50 Best Sales Questions to Determine Your</p>
                </div>
              </div>
              {/* blog box 5 */}
              <div className="blog-post-box d-flex gap-2">
                <div className="blog-post-img">
                  <img src={blog5} className='img-fluid' alt="" />
                </div>
                <div className="blog-post-text">
                  <p>6 Simple Ways to boost your E Commerce</p>
                </div>
              </div>
            </div>
            {/* Recent Comments */}
            <div className="blog-side-box border rounded p-2 mt-4 post-hide">
              <h2 className='border-bottom pb-2'> Recent Comments </h2>
              <div className="blog-post-text mt-1">
                <p>Wilson on ExoticRarePlants Small Jute Modern Plant</p>
              </div>
              <div className="blog-post-text mt-1">
                <p>Jones on Philo Albott Artificial New Xanadu Plant</p>
              </div>
              <div className="blog-post-text mt-1">
                <p>Emily on Euphorbia Natural Cactus Potted Plant</p>
              </div>
              <div className="blog-post-text mt-1">
                <p>Wilson on Dracaena Trifasciata Big Ornamental Plant</p>
              </div>
            </div>
            {/* Category */}
            <div className="blog-side-box border rounded p-2 mt-4">
              <h2 className='border-bottom pb-2'> Category</h2>
              <div className="blog-post-link mt-1">
                <a>Business</a>
              </div>
              <div className="blog-post-link mt-1">
                <a>Information</a>
              </div>
              <div className="blog-post-link mt-1">
                <a>Marketing</a>
              </div>
              <div className="blog-post-link mt-1">
                <a>Promotions</a>
              </div>
              <div className="blog-post-link mt-1">
                <a>Search Engine</a>
              </div>
              <div className="blog-post-link mt-1">
                <a>Social Media</a>
              </div><div className="blog-post-link mt-1">
                <a>Social Media</a>
              </div>
              <div className="blog-post-link mt-1">
                <a>Statistics</a>
              </div>
              <div className="blog-post-link mt-1">
                <a>Writing</a>
              </div>
            </div>
            {/* Tags */}
            <div className="blog-side-box border rounded p-2 mt-4">
              <h2 className="border-bottom pb-2">Tags</h2>
              <div className="blog-post-text mt-3">
                <span>Blogging (4)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Community (6)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Copywriting (4)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Educational (4)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Experiences (4)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Knowledge (5)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Learning (4)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Management (7)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Networking(5)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Photography (4)</span>
              </div>
              <div className="blog-post-text mt-3">
                <span>Success Story(4)</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Blog