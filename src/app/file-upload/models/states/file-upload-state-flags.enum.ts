export enum FileUploadStateFlags {
  None = 0,
  Idle = 1 << 0,
  AwaitingFileSelection = 1 << 1,
  AwaitingFileValidation = 1 << 2,
  ParsingFile = 1 << 3,
  AwaitingDataValidation = 1 << 4,
  FileSelected = 1 << 5,
  AwaitingSubmission = 1 << 6,
  SubmissionSuccess = 1 << 7,
  SubmissionError = 1 << 8,
  ExceedsMaxFileSize = 1 << 20,
  InvalidFileType = 1 << 21,
  AnyFileError = (
    InvalidFileType |
    ExceedsMaxFileSize
  )
}