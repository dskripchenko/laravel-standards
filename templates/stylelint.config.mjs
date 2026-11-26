// BEM in SCSS for new styles (FE-03). A repository that already lints
// styles keeps its config. Adding stylelint is a devDependency (DEP-02).

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      { message: 'Expected a BEM class (block, block__element, block--modifier).' },
    ],
  },
}
