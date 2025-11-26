import React, { useState } from 'react';

const ValuationCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('dcf');
  
  // DCF Calculator State
  const [dcfInputs, setDcfInputs] = useState({
    freeCashFlow: 1000000,
    growthRate: 5,
    discountRate: 10,
    terminalGrowth: 3,
    years: 5
  });
  
  // Revenue Multiple Calculator State
  const [revenueInputs, setRevenueInputs] = useState({
    revenue: 5000000,
    multiple: 8
  });
  
  // EBITDA Multiple Calculator State
  const [ebitdaInputs, setEbitdaInputs] = useState({
    ebitda: 1500000,
    multiple: 12
  });
  
  // SaaS Metrics Calculator State
  const [saasInputs, setSaasInputs] = useState({
    arr: 2000000,
    growthRate: 25,
    netRetention: 110,
    cac: 1500,
    arpc: 500
  });
  
  // Calculate DCF
  const calculateDCF = () => {
    const { freeCashFlow, growthRate, discountRate, terminalGrowth, years } = dcfInputs;
    let presentValue = 0;
    let projectedFCF = freeCashFlow;
    
    // Calculate PV of cash flows
    for (let i = 1; i <= years; i++) {
      projectedFCF *= (1 + growthRate / 100);
      presentValue += projectedFCF / Math.pow(1 + discountRate / 100, i);
    }
    
    // Terminal value
    const terminalValue = (projectedFCF * (1 + terminalGrowth / 100)) / 
                         ((discountRate / 100) - (terminalGrowth / 100));
    const presentTerminalValue = terminalValue / Math.pow(1 + discountRate / 100, years);
    
    return presentValue + presentTerminalValue;
  };
  
  // Calculate Revenue Multiple
  const calculateRevenueMultiple = () => {
    return revenueInputs.revenue * revenueInputs.multiple;
  };
  
  // Calculate EBITDA Multiple
  const calculateEbitdaMultiple = () => {
    return ebitdaInputs.ebitda * ebitdaInputs.multiple;
  };
  
  // Calculate SaaS Metrics
  const calculateSaasMetrics = () => {
    const { arr, growthRate, netRetention, cac, arpc } = saasInputs;
    const ltv = (arpc * netRetention / 100) / (cac / arpc);
    const magicNumber = (arr * (growthRate / 100)) / (cac * 12);
    return { ltv, magicNumber };
  };
  
  const calculators = [
    { id: 'dcf', name: 'DCF Calculator', icon: '💰' },
    { id: 'revenue', name: 'Revenue Multiple', icon: '📈' },
    { id: 'ebitda', name: 'EBITDA Multiple', icon: '📊' },
    { id: 'saas', name: 'SaaS Metrics', icon: '💻' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Valuation Calculators</h2>
        <p className="text-gray-600">Calculate startup valuations using various methodologies</p>
      </div>
      
      {/* Calculator Selector */}
      <div className="flex flex-wrap gap-2">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => setActiveCalculator(calc.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeCalculator === calc.id
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{calc.icon}</span>
            {calc.name}
          </button>
        ))}
      </div>
      
      {/* DCF Calculator */}
      {activeCalculator === 'dcf' && (
        <div className="bg-white rounded-xl border-2 border-[#FF8C42] p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Discounted Cash Flow (DCF) Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Free Cash Flow ($)</label>
              <input
                type="number"
                value={dcfInputs.freeCashFlow}
                onChange={(e) => setDcfInputs({...dcfInputs, freeCashFlow: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Growth Rate (%)</label>
              <input
                type="number"
                value={dcfInputs.growthRate}
                onChange={(e) => setDcfInputs({...dcfInputs, growthRate: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Rate (%)</label>
              <input
                type="number"
                value={dcfInputs.discountRate}
                onChange={(e) => setDcfInputs({...dcfInputs, discountRate: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Terminal Growth Rate (%)</label>
              <input
                type="number"
                value={dcfInputs.terminalGrowth}
                onChange={(e) => setDcfInputs({...dcfInputs, terminalGrowth: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Projection Years</label>
              <input
                type="number"
                value={dcfInputs.years}
                onChange={(e) => setDcfInputs({...dcfInputs, years: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">Valuation Result</h4>
                <p className="text-sm text-gray-600">Based on DCF methodology</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6A00]">
                  ${calculateDCF().toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600">Enterprise Value</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Revenue Multiple Calculator */}
      {activeCalculator === 'revenue' && (
        <div className="bg-white rounded-xl border-2 border-[#FF8C42] p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Multiple Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue ($)</label>
              <input
                type="number"
                value={revenueInputs.revenue}
                onChange={(e) => setRevenueInputs({...revenueInputs, revenue: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Multiple</label>
              <input
                type="number"
                step="0.1"
                value={revenueInputs.multiple}
                onChange={(e) => setRevenueInputs({...revenueInputs, multiple: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">Valuation Result</h4>
                <p className="text-sm text-gray-600">Based on Revenue Multiple</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6A00]">
                  ${calculateRevenueMultiple().toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600">Enterprise Value</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* EBITDA Multiple Calculator */}
      {activeCalculator === 'ebitda' && (
        <div className="bg-white rounded-xl border-2 border-[#FF8C42] p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">EBITDA Multiple Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">EBITDA ($)</label>
              <input
                type="number"
                value={ebitdaInputs.ebitda}
                onChange={(e) => setEbitdaInputs({...ebitdaInputs, ebitda: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">EBITDA Multiple</label>
              <input
                type="number"
                step="0.1"
                value={ebitdaInputs.multiple}
                onChange={(e) => setEbitdaInputs({...ebitdaInputs, multiple: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">Valuation Result</h4>
                <p className="text-sm text-gray-600">Based on EBITDA Multiple</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6A00]">
                  ${calculateEbitdaMultiple().toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600">Enterprise Value</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* SaaS Metrics Calculator */}
      {activeCalculator === 'saas' && (
        <div className="bg-white rounded-xl border-2 border-[#FF8C42] p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">SaaS Metrics Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Recurring Revenue (ARR) ($)</label>
              <input
                type="number"
                value={saasInputs.arr}
                onChange={(e) => setSaasInputs({...saasInputs, arr: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Growth Rate (%)</label>
              <input
                type="number"
                value={saasInputs.growthRate}
                onChange={(e) => setSaasInputs({...saasInputs, growthRate: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Net Dollar Retention (%)</label>
              <input
                type="number"
                value={saasInputs.netRetention}
                onChange={(e) => setSaasInputs({...saasInputs, netRetention: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Acquisition Cost (CAC) ($)</label>
              <input
                type="number"
                value={saasInputs.cac}
                onChange={(e) => setSaasInputs({...saasInputs, cac: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Average Revenue Per Customer (ARPC) ($)</label>
              <input
                type="number"
                value={saasInputs.arpc}
                onChange={(e) => setSaasInputs({...saasInputs, arpc: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">LTV:CAC Ratio</h4>
                  <p className="text-sm text-gray-600">Customer Lifetime Value</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6A00]">
                    {(calculateSaasMetrics().ltv).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">Magic Number</h4>
                  <p className="text-sm text-gray-600">Efficiency Metric</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6A00]">
                    {(calculateSaasMetrics().magicNumber).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuationCalculators;