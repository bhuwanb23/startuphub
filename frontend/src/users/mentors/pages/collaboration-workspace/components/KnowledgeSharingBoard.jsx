import React, { useState } from 'react';

const KnowledgeSharingBoard = () => {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: 'Best practices for market validation', 
      author: 'Alex Morgan', 
      category: 'Product Strategy', 
      upvotes: 24, 
      comments: 8, 
      date: '2023-06-15',
      content: 'After working with 20+ startups, I\'ve identified key patterns for effective market validation...'
    },
    { 
      id: 2, 
      title: 'Fundraising strategies for early-stage startups', 
      author: 'Sarah Johnson', 
      category: 'Fundraising', 
      upvotes: 18, 
      comments: 12, 
      date: '2023-06-12',
      content: 'Here are some proven approaches for securing your first round of funding...'
    },
    { 
      id: 3, 
      title: 'Microservices architecture patterns', 
      author: 'Michael Chen', 
      category: 'Tech Architecture', 
      upvotes: 32, 
      comments: 15, 
      date: '2023-06-10',
      content: 'In this post, I\'ll share battle-tested microservices patterns that have worked across multiple projects...'
    }
  ]);

  const [categories] = useState([
    'All', 'Product Strategy', 'Fundraising', 'Tech Architecture', 'Marketing', 'Legal'
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState({ title: '', category: 'Product Strategy', content: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const post = {
        id: Date.now(),
        ...newPost,
        author: 'You',
        upvotes: 0,
        comments: 0,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', category: 'Product Strategy', content: '' });
      setShowNewPostForm(false);
    }
  };

  const handleUpvote = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  const handleSummarize = (id) => {
    alert('AI Summarize feature would generate a summary of this thread here.');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Knowledge Sharing Board</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button 
            onClick={() => setShowNewPostForm(true)}
            className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Post
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 text-sm rounded-full ${
              selectedCategory === category
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {showNewPostForm && (
        <div className="bg-[#FFF9F0] rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Post</h3>
          <form onSubmit={handleCreatePost}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                required
              />
            </div>
            <div className="mb-4">
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              >
                <option value="Product Strategy">Product Strategy</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Tech Architecture">Tech Architecture</option>
                <option value="Marketing">Marketing</option>
                <option value="Legal">Legal</option>
              </select>
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Post content"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                required
              ></textarea>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors"
              >
                Publish Post
              </button>
              <button
                type="button"
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <span className="px-2 py-1 bg-[#FFF9F0] text-[#FF6A00] rounded-full text-xs font-medium">
                {post.category}
              </span>
            </div>
            <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center text-gray-500 hover:text-[#FF6A00]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{post.upvotes}</span>
                  </button>
                </div>
                <div className="flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                  <span>{post.comments} comments</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">by {post.author}</span>
                <span className="text-sm text-gray-500">{post.date}</span>
                <button 
                  onClick={() => handleSummarize(post.id)}
                  className="text-sm text-[#FF6A00] hover:text-[#FF8C42] font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  AI Summarize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No discussions found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeSharingBoard;