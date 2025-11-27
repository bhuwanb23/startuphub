import React, { useState } from 'react';

const CodeSnippets = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'nlp', name: 'Natural Language Processing' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'iot', name: 'IoT' },
    { id: 'physics', name: 'Physics' }
  ];

  const languages = [
    { id: 'all', name: 'All Languages' },
    { id: 'python', name: 'Python' },
    { id: 'matlab', name: 'MATLAB' },
    { id: 'cpp', name: 'C++' },
    { id: 'r', name: 'R' },
    { id: 'javascript', name: 'JavaScript' }
  ];

  const snippets = [
    {
      id: 1,
      title: 'Linear Regression Implementation',
      description: 'Simple linear regression model from scratch',
      category: 'ml',
      language: 'python',
      code: `import numpy as np
              
def linear_regression(X, y):
    # Add bias term
    X_b = np.c_[np.ones((X.shape[0], 1)), X]
    
    # Calculate weights using normal equation
    theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)
    
    return theta_best
    
# Example usage
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])
theta = linear_regression(X, y)
print(f"Parameters: {theta}")`,
      tags: ['regression', 'numpy', 'machine-learning']
    },
    {
      id: 2,
      title: 'K-Means Clustering',
      description: 'Implementation of K-means clustering algorithm',
      category: 'ml',
      language: 'python',
      code: `import numpy as np
import matplotlib.pyplot as plt

def kmeans(X, k, max_iters=100):
    # Initialize centroids randomly
    centroids = X[np.random.choice(X.shape[0], k, replace=False)]
    
    for _ in range(max_iters):
        # Assign points to closest centroid
        distances = np.sqrt(((X - centroids[:, np.newaxis])**2).sum(axis=2))
        labels = np.argmin(distances, axis=0)
        
        # Update centroids
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        
        # Check for convergence
        if np.all(centroids == new_centroids):
            break
            
        centroids = new_centroids
        
    return centroids, labels`,
      tags: ['clustering', 'unsupervised', 'numpy']
    },
    {
      id: 3,
      title: 'Fourier Transform',
      description: 'Discrete Fourier Transform implementation',
      category: 'physics',
      language: 'matlab',
      code: `function X = dft(x)
    N = length(x);
    X = zeros(1, N);
    
    for k = 0:N-1
        for n = 0:N-1
            X(k+1) = X(k+1) + x(n+1) * exp(-1j * 2 * pi * k * n / N);
        end
    end
end

% Example usage
x = [1, 2, 3, 4];
X = dft(x);
disp(X);`,
      tags: ['signal-processing', 'mathematics', 'complex-numbers']
    },
    {
      id: 4,
      title: 'PID Controller',
      description: 'Proportional-Integral-Derivative controller',
      category: 'robotics',
      language: 'cpp',
      code: `class PIDController {
private:
    double Kp, Ki, Kd;
    double prev_error, integral;
    
public:
    PIDController(double p, double i, double d) 
        : Kp(p), Ki(i), Kd(d), prev_error(0), integral(0) {}
    
    double compute(double setpoint, double actual, double dt) {
        double error = setpoint - actual;
        integral += error * dt;
        double derivative = (error - prev_error) / dt;
        
        double output = Kp * error + Ki * integral + Kd * derivative;
        prev_error = error;
        
        return output;
    }
};`,
      tags: ['control-systems', 'robotics', 'real-time']
    }
  ];

  // Filter snippets based on selections
  const filteredSnippets = snippets.filter(snippet => {
    const categoryMatch = selectedCategory === 'all' || snippet.category === selectedCategory;
    const languageMatch = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    return categoryMatch && languageMatch;
  });

  // Get language color
  const getLanguageColor = (language) => {
    switch (language) {
      case 'python': return 'bg-blue-100 text-blue-800';
      case 'matlab': return 'bg-purple-100 text-purple-800';
      case 'cpp': return 'bg-orange-100 text-orange-800';
      case 'r': return 'bg-green-100 text-green-800';
      case 'javascript': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get category name
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  // Get language name
  const getLanguageName = (languageId) => {
    const language = languages.find(lang => lang.id === languageId);
    return language ? language.name : languageId;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">⌨️ Code Snippets Repository</h1>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map(language => (
              <option key={language.id} value={language.id}>{language.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSnippets.map((snippet) => (
          <div key={snippet.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{snippet.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{snippet.description}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(snippet.language)}`}>
                    {getLanguageName(snippet.language)}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {getCategoryName(snippet.category)}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {snippet.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              <pre className="bg-gray-900 rounded p-4 text-gray-300 text-sm overflow-x-auto">
                <code>{snippet.code}</code>
              </pre>
              
              <div className="flex space-x-3 mt-4">
                <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                  Copy to Clipboard
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Repository Stats */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Repository Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{snippets.length}</div>
            <div className="text-sm text-gray-600">Total Snippets</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(snippets.map(s => s.language)).size}
            </div>
            <div className="text-sm text-gray-600">Languages</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(snippets.map(s => s.category)).size}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {snippets.reduce((total, s) => total + s.tags.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Tags</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippets;