const _ = require('lodash')
const StateGenerator = require('../StateGenerator')
const removeEffect = require('../../libs/removeEffect')

module.exports = class RemoveEffect extends StateGenerator {
  constructor(args, opts) {
    super(args, opts)
  }

  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'stateName',
        message: 'Select a state:',
        choices: this.states,
      },
    ])
      .then(answers => {
        this.answers = answers
        const effects = Object.values(this.getEffects(answers.stateName))

        if (effects.length < 1) {
          this.log(
            'No effect available in this state or all of them already have reducer. Aborted',
          )
          throw new Error('No effect available')
        }

        return this.prompt([
          {
            type: 'checkbox',
            name: 'effectsName',
            message: 'Select a effects:',
            choices: effects,
          },
        ])
      })
      .then(answers => {
        this.answers = {
          ...this.answers,
          ...answers,
        }
      })
  }

  writing() {
    const { stateName, effectsName } = this.answers
    console.log('49', this.answers)
    removeEffect(this, stateName, effectsName)
  }

  end() {
    this.answers = {}
  }
}