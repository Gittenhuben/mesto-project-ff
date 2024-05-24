const presets = [
  ['@babel/preset-env', {
    targets: {
      firefox: '115',
      chrome: '109',
      opera: '95'
    },

    useBuiltIns: "entry"
  }]
];

module.exports = { presets }; 
