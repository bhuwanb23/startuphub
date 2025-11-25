import React, { useState } from 'react';

const PitchDeck = () => {
  const [pitchDecks, setPitchDecks] = useState([
    {
      id: 1,
      name: 'Seed Round Pitch Deck',
      version: 'v2.1',
      created: '2023-06-15',
      updated: '2023-07-22',
      downloads: 124,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Series A Pitch Deck',
      version: 'v1.0',
      created: '2023-08-30',
      updated: '2023-09-15',
      downloads: 87,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Investor Meeting Deck',
      version: 'v1.5',
      created: '2023-05-10',
      updated: '2023-05-20',
      downloads: 203,
      status: 'Archived',
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDeck, setNewDeck] = useState({
    name: '',
    file: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDeck({
        ...newDeck,
        file: file,
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      });
    }
  };

  const handleUploadDeck = (e) => {
    e.preventDefault();
    if (newDeck.file) {
      const deck = {
        id: pitchDecks.length + 1,
        name: newDeck.name,
        version: 'v1.0',
        created: new Date().toISOString().split('T')[0],
        updated: new Date().toISOString().split('T')[0],
        downloads: 0,
        status: 'Active',
      };
      setPitchDecks([deck, ...pitchDecks]);
      setNewDeck({ name: '', file: null });
      setShowUploadForm(false);
    }
  };

  const handleDeleteDeck = (id) => {
    setPitchDecks(pitchDecks.filter(deck => deck.id !== id));
  };

  const handleDownloadDeck = (id) => {
    // In a real app, this would download the actual file
    const deck = pitchDecks.find(d => d.id === id);
    if (deck) {
      setPitchDecks(pitchDecks.map(d => 
        d.id === id ? { ...d, downloads: d.downloads + 1 } : d
      ));
      alert(`Downloading ${deck.name}...`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pitch Deck Repository</h1>
          <p className="text-gray-600 mt-1">Manage and share your startup's pitch decks</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showUploadForm ? 'Cancel' : 'Upload New Deck'}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Upload New Pitch Deck</h2>
          <form onSubmit={handleUploadDeck} className="space-y-4">
            <div>
              <label htmlFor="deckName" className="block text-sm font-medium text-gray-700 mb-1">
                Deck Name
              </label>
              <input
                type="text"
                id="deckName"
                value={newDeck.name}
                onChange={(e) => setNewDeck({...newDeck, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Series A Pitch Deck"
                required
              />
            </div>
            <div>
              <label htmlFor="deckFile" className="block text-sm font-medium text-gray-700 mb-1">
                Select File
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PPTX, PDF, KEY (MAX. 50MB)</p>
                  </div>
                  <input 
                    id="deckFile" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    accept=".pptx,.pdf,.key"
                  />
                </label>
              </div>
              {newDeck.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {newDeck.file.name}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newDeck.file}
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                Upload Deck
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pitch Decks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pitchDecks.map((deck) => (
          <div key={deck.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{deck.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {deck.version}
                    </span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      deck.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {deck.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteDeck(deck.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{deck.created}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Updated:</span>
                  <span>{deck.updated}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Downloads:</span>
                  <span>{deck.downloads}</span>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => handleDownloadDeck(deck.id)}
                  className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all text-sm"
                >
                  Download
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchDeck;