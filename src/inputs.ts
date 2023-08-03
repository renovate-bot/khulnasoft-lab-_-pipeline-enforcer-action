import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

import {PipelineEnforcerEndFlags, PipelineEnforcerStartFlags} from './types'

export const extractStartInputs = (): PipelineEnforcerStartFlags => {
  const repoPath = core.getInput('repo-path')
  const matrix = core.getInput('matrix')

  return {
    verbose: core.getInput('verbose') === 'true',
    quiet: core.getInput('quiet') === 'true',
    logFile: core.getInput('log-file'),
    repoPath: repoPath || '.',
    accessToken: core.getInput('access-token'),
    khulnasoftKey: core.getInput('khulnasoft-key'),
    khulnasoftSecret: core.getInput('khulnasoft-secret'),
    matrix: matrix == 'null' ? '' : matrix
  }
}

export const validateInputs = (flags: PipelineEnforcerStartFlags) => {
  if (!flags.khulnasoftKey) {
    throw new Error('Required input khulnasoft-key is empty')
  }

  if (!flags.khulnasoftSecret) {
    throw new Error('Required input khulnasoft-secret is empty')
  }

  if (!flags.accessToken) {
    throw new Error('Required input access-token is empty')
  }

  if (!isMatrixValid(flags.matrix)) {
    throw new Error(`Matrix ${flags.matrix} is not a valid JSON`)
  }
}

export const extractEndInputs = (): PipelineEnforcerEndFlags => {
  return {
    verbose: core.getInput('verbose') === 'true',
    quiet: core.getInput('quiet') === 'true',
    logFile: core.getInput('log-file'),
    khulnasoftKey: core.getInput('khulnasoft-key'),
    khulnasoftSecret: core.getInput('khulnasoft-secret')
  }
}

export const validateEndInputs = (flags: PipelineEnforcerEndFlags) => {
  if (!flags.khulnasoftKey) {
    throw new Error('Required input khulnasoft-key is empty')
  }

  if (!flags.khulnasoftSecret) {
    throw new Error('Required input khulnasoft-secret is empty')
  }
}

export const isLogFilePathValid = (logFilePath: string): boolean => {
  const logFileDir = path.dirname(logFilePath)
  return fs.existsSync(logFileDir)
}

export const isMatrixValid = (matrix: string): boolean => {
  if (matrix == '') {
    return true
  }

  try {
    JSON.parse(matrix)
    return true
  } catch (e) {
    return false
  }
}
