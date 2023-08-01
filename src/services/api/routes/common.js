// Rules
export const rulesListURL = {
  url: 'rules',
  method: 'GET',
}

export const addRulesURL = {
  url: 'rules',
  method: 'POST',
}

export const updateRulesURL = (id) => ({
  url: `rules/${id}`,
  method: 'POST',
})

export const getRulesURL = (id) => ({
  url: `rules/${id}`,
  method: 'GET',
})

// Transaction
export const transactionListURL = {
  url: 'transactions',
  method: 'GET',
}

