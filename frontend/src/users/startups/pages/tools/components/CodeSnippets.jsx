import React, { useState } from 'react';

const CodeSnippets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for code snippets
  const snippets = [
    {
      id: 1,
      name: 'REST API Authentication',
      language: 'JavaScript',
      category: 'Authentication',
      framework: 'Node.js',
      difficulty: 'Intermediate',
      likes: 240,
      downloads: 180,
      tags: ['JWT', 'OAuth', 'Security'],
      preview: '🔐',
      code: `const jwt = require('jsonwebtoken');
      
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}`,
    },
    {
      id: 2,
      name: 'Database Connection Pool',
      language: 'Python',
      category: 'Database',
      framework: 'Django',
      difficulty: 'Beginner',
      likes: 190,
      downloads: 150,
      tags: ['PostgreSQL', 'Connection', 'Pool'],
      preview: '🔌',
      code: `import psycopg2
from psycopg2 import pool

class DatabasePool:
    def __init__(self):
        self.connection_pool = psycopg2.pool.SimpleConnectionPool(
            1, 20,
            user="username",
            password="password",
            host="localhost",
            port="5432",
            database="mydb"
        )
    
    def get_connection(self):
        return self.connection_pool.getconn()
    
    def put_connection(self, connection):
        self.connection_pool.putconn(connection)`,
    },
    {
      id: 3,
      name: 'React State Management',
      language: 'JavaScript',
      category: 'Frontend',
      framework: 'React',
      difficulty: 'Intermediate',
      likes: 320,
      downloads: 280,
      tags: ['Hooks', 'Context', 'State'],
      preview: '⚛️',
      code: `import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);`,
    },
    {
      id: 4,
      name: 'Docker Compose Setup',
      language: 'YAML',
      category: 'DevOps',
      framework: 'Docker',
      difficulty: 'Beginner',
      likes: 180,
      downloads: 140,
      tags: ['Container', 'Orchestration', 'Setup'],
      preview: '🐳',
      code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
    },
    {
      id: 5,
      name: 'Machine Learning Pipeline',
      language: 'Python',
      category: 'AI/ML',
      framework: 'Scikit-learn',
      difficulty: 'Advanced',
      likes: 150,
      downloads: 120,
      tags: ['ML', 'Pipeline', 'Scikit-learn'],
      preview: '🤖',
      code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100))
])

pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)`,
    },
  ];

  const languages = [
    { id: 'all', name: 'All Languages' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'go', name: 'Go' },
    { id: 'yaml', name: 'YAML' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'authentication', name: 'Authentication' },
    { id: 'database', name: 'Database' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'devops', name: 'DevOps' },
    { id: 'ai/ml', name: 'AI/ML' },
  ];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = selectedLanguage === 'all' || snippet.language.toLowerCase() === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || snippet.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Code Snippets</h1>
        <p className="text-gray-600 mt-1">Reusable code snippets for common development tasks</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Code Insight</h2>
            <p className="text-gray-700 mt-1">
              The React State Management snippet is our most popular with 320 likes. 
              It implements a clean context-based state management pattern that scales well.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search code snippets..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {languages.map(language => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Code Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSnippets.map((snippet) => (
          <div key={snippet.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="text-4xl">{snippet.preview}</div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {snippet.language}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {snippet.framework}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{snippet.name}</h3>
              <div className="flex items-center mt-1">
                <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  {snippet.category}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {snippet.difficulty}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {snippet.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Code Preview */}
            <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-gray-200 text-sm">
                <code>{snippet.code.substring(0, 150)}...</code>
              </pre>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div>👍 {snippet.likes} likes</div>
                <div>⬇️ {snippet.downloads} downloads</div>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Copy Code
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Full
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Code Snippets Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Code Snippets Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">86</div>
            <div className="text-sm text-gray-600">Total Snippets</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">4.2K</div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">12.8K</div>
            <div className="text-sm text-gray-600">Lines of Code</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">6</div>
            <div className="text-sm text-gray-600">Supported Languages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippets;