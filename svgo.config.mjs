export default { 
  plugins: [ 
    { 
      name: 'preset-default', 
      params: { 
        overrides: { 
          // customize the params of a default plugin 
          inlineStyles: { 
            onlyMatchedOnce: false, 
          }, 
        }, 
      }, 
    },
    {
      name: 'removeViewBox',
      active: false
    }
  ], 
};
