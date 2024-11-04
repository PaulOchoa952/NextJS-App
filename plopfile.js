module.exports = function (plop) {
  // component generator
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Component name?'
    }],
    actions: [{
      type: 'add',
      path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
      templateFile: 'templates/Component.tsx.hbs'
    }]
  });

  // service generator
  plop.setGenerator('service', {
    description: 'Create a new service',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Service name?'
    }],
    actions: [{
      type: 'add',
      path: 'src/services/{{camelCase name}}Service.ts',
      templateFile: 'templates/Service.ts.hbs'
    }]
  });
}; 