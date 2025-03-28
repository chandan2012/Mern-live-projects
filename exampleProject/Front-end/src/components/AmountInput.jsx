import React from 'react'

const AmountInput = ({amount,onChange}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
      <input type="number" value={amount} onChange={(e) => onChange(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2" placeholder="Enter amount" />
    </div>
  )
}

export default AmountInput;