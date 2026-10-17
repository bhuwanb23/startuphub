import React, { useState } from 'react';

const ResearchReviewSystem = () => {
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      title: 'AI-Powered Drug Discovery Methods', 
      author: 'Dr. Sarah Johnson',
      department: 'Biotechnology',
      status: 'Under Review',
      reviewers: ['Prof. Michael Chen', 'Dr. Emily Rodriguez'],
      deadline: '2023-07-30',
      score: null
    },
    { 
      id: 2, 
      title: 'Sustainable Energy Storage Solutions', 
      author: 'Prof. Michael Chen',
      department: 'Chemical Engineering',
      status: 'Reviewed',
      reviewers: ['Dr. Sarah Johnson', 'Dr. Emily Rodriguez'],
      deadline: '2023-07-15',
      score: 4.2
    },
    { 
      id: 3, 
      title: 'Quantum Computing Optimization Algorithms', 
      author: 'Dr. Emily Rodriguez',
      department: 'Computer Science',
      status: 'Pending Review',
      reviewers: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
      deadline: '2023-08-15',
      score: null
    }
  ]);

  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewScore, setReviewScore] = useState(0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reviewed': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitReview = () => {
    if (!selectedReview) return;
    
    const updatedReviews = reviews.map(review => {
      if (review.id === selectedReview.id) {
        return {
          ...review,
          status: 'Reviewed',
          score: reviewScore
        };
      }
      return review;
    });
    
    setReviews(updatedReviews);
    setSelectedReview(null);
    setReviewComments('');
    setReviewScore(0);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Research Review System</h1>
        <p className="text-gray-600">Faculty peer-review system with scoring and comments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Research Papers for Review</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className={`border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedReview?.id === review.id ? 'ring-2 ring-[#F4A300]' : ''
                }`}
                onClick={() => setSelectedReview(review)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800 text-sm">{review.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </div>
                
                <div className="text-xs text-gray-600 mb-2">
                  <div>{review.author}</div>
                  <div>{review.department}</div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Due: {review.deadline}</span>
                  {review.score && (
                    <span className="font-medium text-gray-800">Score: {review.score}/5</span>
                  )}
                </div>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {review.reviewers.map((reviewer, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {reviewer}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          {selectedReview ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{selectedReview.title}</h2>
                  <div className="text-sm text-gray-600">
                    {selectedReview.author} • {selectedReview.department}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedReview.status)}`}>
                  {selectedReview.status}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Abstract</h3>
                <p className="text-gray-700 text-sm">
                  This research presents novel approaches to drug discovery using artificial intelligence algorithms. 
                  The methodology combines deep learning with molecular dynamics simulations to predict drug-target interactions 
                  with unprecedented accuracy. Initial tests show a 40% improvement in prediction accuracy compared to existing methods.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Review Comments</h3>
                <textarea
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                  placeholder="Enter your review comments here..."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Scoring (1-5)</h3>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewScore(star)}
                      className="text-2xl focus:outline-none"
                    >
                      {star <= reviewScore ? '★' : '☆'}
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">{reviewScore}/5</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Review due: {selectedReview.deadline}
                </div>
                <div className="flex space-x-3">
                  <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                    Download Paper
                  </button>
                  <button 
                    onClick={handleSubmitReview}
                    className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="mt-2">Select a research paper to review</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Statistics */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Review Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">3</div>
            <div className="text-sm text-gray-600">Papers to Review</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">1</div>
            <div className="text-sm text-gray-600">Reviewed This Week</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">4.2</div>
            <div className="text-sm text-gray-600">Avg. Score Given</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">85%</div>
            <div className="text-sm text-gray-600">On-Time Reviews</div>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
            View Detailed Review Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchReviewSystem;