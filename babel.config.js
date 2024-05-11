const presets = [
  ['@babel/preset-env', {
    targets: {
      firefox: '115',
      chrome: '109'
    },

    useBuiltIns: "entry"
  }]
];

module.exports = { presets }; 
