import React, { useState } from 'react';

const GroupDiscussions = () => {
  const [groups] = useState([
    {
      id: 1,
      name: 'TechFlow Inc. Mentorship',
      members: 12,
      latestActivity: '2 hours ago',
      unread: 3,
      category: 'Mentorship'
    },
    {
      id: 2,
      name: 'Startup Funding Strategies',
      members: 24,
      latestActivity: '5 hours ago',
      unread: 0,
      category: 'Finance'
    },
    {
      id: 3,
      name: 'Product Development Best Practices',
      members: 18,
      latestActivity: '1 day ago',
      unread: 7,
      category: 'Product'
    },
    {
      id: 4,
      name: 'Market Entry Tactics',
      members: 15,
      latestActivity: '2 days ago',
      unread: 0,
      category: 'Marketing'
    }
  ]);

  const [threads] = useState([
    {
      id: 1,
      groupId: 1,
      title: 'Feedback on UI prototype',
      author: 'Alex Morgan',
      replies: 8,
      views: 24,
      latestReply: '1 hour ago',
      isPinned: true
    },
    {
      id: 2,
      groupId: 1,
      title: 'Technical architecture review needed',
      author: 'Priya Sharma',
      replies: 12,
      views: 42,
      latestReply: '3 hours ago',
      isPinned: false
    },
    {
      id: 3,
      groupId: 2,
      title: 'VC funding vs Angel investment',
      author: 'David Wilson',
      replies: 15,
      views: 67,
      latestReply: '4 hours ago',
      isPinned: true
    },
    {
      id: 4,
      groupId: 3,
      title: 'User testing methodologies',
      author: 'Sarah Johnson',
      replies: 9,
      views: 31,
      latestReply: '1 day ago',
      isPinned: false
    }
  ]);

  const [polls] = useState([
    {
      id: 1,
      question: 'Which feature should we prioritize for Q3?',
      options: [
        { id: 1, text: 'Mobile app redesign', votes: 12 },
        { id: 2, text: 'API performance optimization', votes: 8 },
        { id: 3, text: 'Admin dashboard enhancements', votes: 5 },
        { id: 4, text: 'Customer support chatbot', votes: 7 }
      ],
      totalVotes: 32,
      hasVoted: false
    }
  ]);

  const [activeTab, setActiveTab] = useState('groups');
  const [selectedGroup, setSelectedGroup] = useState(1);

  const handleVote = (pollId, optionId) => {
    // In a real app, this would update the poll state
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Group Discussions</h2>
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium">
            + New Group
          </button>
        </div>
        <p className="text-gray-600">Topic-wise group rooms with threads, polls, and Q&A</p>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'groups'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Groups
        </button>
        <button
          onClick={() => setActiveTab('threads')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'threads'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Threads
        </button>
        <button
          onClick={() => setActiveTab('polls')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'polls'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Polls
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'qa'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Q&A
        </button>
      </div>

      {activeTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div 
              key={group.id} 
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedGroup(group.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">{group.name}</h3>
                {group.unread > 0 && (
                  <span className="bg-[#FF6A00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {group.unread}
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{group.members} members</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {group.category}
                </span>
                <span className="text-xs text-gray-500">{group.latestActivity}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'threads' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Active Threads</h3>
            <button className="text-sm text-[#FF6A00] hover:text-[#FF8C42] font-medium">
              + New Thread
            </button>
          </div>
          <div className="space-y-3">
            {threads
              .filter(thread => thread.groupId === selectedGroup)
              .map((thread) => (
                <div key={thread.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {thread.isPinned && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                        </svg>
                      )}
                      <h4 className="font-bold text-gray-800">{thread.title}</h4>
                    </div>
                    <span className="text-xs text-gray-500">{thread.latestReply}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span>by {thread.author}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-3">{thread.replies} replies</span>
                    <span className="mr-3">{thread.views} views</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 'polls' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Active Polls</h3>
            <button className="text-sm text-[#FF6A00] hover:text-[#FF8C42] font-medium">
              + New Poll
            </button>
          </div>
          <div className="space-y-6">
            {polls.map((poll) => (
              <div key={poll.id} className="border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-800 mb-4">{poll.question}</h4>
                <div className="space-y-3">
                  {poll.options.map((option) => {
                    const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                    return (
                      <div key={option.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{option.text}</span>
                          <span>{percentage}% ({option.votes})</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6A00] h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  {poll.totalVotes} votes • {poll.hasVoted ? 'You voted' : 'Not voted'}
                </div>
                {!poll.hasVoted && (
                  <div className="mt-4">
                    <button className="px-3 py-1.5 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm">
                      Vote
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'qa' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Q&A Forum</h3>
            <button className="text-sm text-[#FF6A00] hover:text-[#FF8C42] font-medium">
              + Ask Question
            </button>
          </div>
          <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFDAB9]">
            <div className="flex">
              <div className="mr-3 text-[#FF6A00]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">AI Summarization Feature</p>
                <p className="text-sm text-gray-700">
                  Our AI automatically summarizes long discussion threads to highlight key points and action items.
                  Look for the "AI Summary" button on any thread with more than 10 replies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDiscussions;