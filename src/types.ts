export type PipelineEnforcerFlags = {
  verbose?: boolean
  quiet?: boolean
  logFile?: string
  khulnasoftKey: string
  khulnasoftSecret: string
}

export type PipelineEnforcerStartFlags = PipelineEnforcerFlags & {
  repoPath: string
  accessToken: string
  matrix: string
}

export type PipelineEnforcerEndFlags = PipelineEnforcerFlags
