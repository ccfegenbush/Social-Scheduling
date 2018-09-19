export function getStocks() {
    return [
      { abbr: 'ADANIPORTS', name: 'Adani Ports & Special Economic Zone Ltd.' },
      { abbr: 'ASIANPAINT', name: 'Asian Paints Ltd.' },
      { abbr: 'AXISBANK', name: 'Axis Bank Ltd.' },
      { abbr: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd.' },
      { abbr: 'BAJFINANCE', name: 'Bajaj Finance' },
      { abbr: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd.' },
      { abbr: 'BPCL', name: 'Bharat Petroleum Corporation Ltd.' },
      { abbr: 'BHARTIARTL', name: 'Bharti Airtel Ltd.' },
      { abbr: 'INFRATEL', name: 'Bharti Infratel' },
      { abbr: 'CIPLA', name: 'Cipla Ltd.' },
      { abbr: 'COALINDIA', name: 'Coal India Ltd' },
      { abbr: 'DRREDDY', name: 'Dr. Reddys Laboratories Ltd.' },
      { abbr: 'EICHERMOT', name: 'Eicher Motors Ltd.' },
      { abbr: 'GAIL', name: 'GAIL (India) Ltd.' },
      { abbr: 'GRASIM', name: 'Grasim Industries Ltd.' },
      { abbr: 'HCLTECH', name: 'HCL Technologies Ltd.' },
      { abbr: 'HDFCBANK', name: 'HDFC Bank Ltd.' },
      { abbr: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd.' },
      { abbr: 'HINDALCO', name: 'Hindalco Industries Ltd.' },
      { abbr: 'HINDPETRO', name: 'Hindustan Petroleum Corporation Ltd.' },
      { abbr: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.' },
      { abbr: 'HDFC', name: 'Housing Development Finance Corporation Ltd.' },
      { abbr: 'ITC', name: 'I T C Ltd.' },
      { abbr: 'ICICIBANK', name: 'ICICI Bank Ltd.' },
      { abbr: 'IBULHSGFIN', name: 'Indiabulls Housing Finance' },
      { abbr: 'IOC', name: 'Indian Oil Corporation Ltd.' },
      { abbr: 'INDUSINDBK', name: 'IndusInd Bank Ltd.' },
      { abbr: 'INFY	', name: 'Infosys Ltd.' },
      { abbr: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.' },
      { abbr: 'LT', name: 'Larsen & Toubro Ltd.' },
      { abbr: 'LUPIN', name: 'Lupin Ltd.' },
      { abbr: 'M&M', name: 'Mahindra & Mahindra Ltd.' },
      { abbr: 'MARUTI', name: 'Maruti Suzuki India Ltd.' },
      { abbr: 'NTPC', name: 'NTPC Ltd.' },
      { abbr: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd.' },
      { abbr: 'POWERGRID', name: 'Power Grid Corporation of India Ltd.' },
      { abbr: 'RELIANCE', name: 'Reliance Industries Ltd.' },
      { abbr: 'SBIN', name: 'State Bank of India' },
      { abbr: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd.' },
      { abbr: 'TCS', name: 'Tata Consultancy Services Ltd.' },
      { abbr: 'TATAMOTORS', name: 'Tata Motors Ltd.' },
      { abbr: 'TATASTEEL', name: 'Tata Steel Ltd.' },
      { abbr: 'TECHM', name: 'Tech Mahindra Ltd.' },
      { abbr: 'TITAN', name: 'Titan Company Ltd.' },
      { abbr: 'ULTRACEMCO', name: 'UltraTech Cement Ltd.' },
      { abbr: 'UPL', name: 'UPL Ltd.' },
      { abbr: 'VEDL', name: 'Vedanta Ltd' },
      { abbr: 'WIPRO', name: 'Wipro Ltd.' },
      { abbr: 'YESBANK', name: 'Yes Bank Ltd.' },
      { abbr: 'ZEEL', name: 'Zee Entertainment Enterprises Ltd.' }
    ];
  }

  export function matchStocks(state:any, value:any) {
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }