export enum PrismaErrorCode {
  UniqueConstraintViolation = "P2002",
  ForeignKeyConstraintViolation = "P2003",
  InvalidFieldValue = "P2005",
  RecordNotFound = "P2025",
  ConnectionError = "P1001",
  UnknownError = "UNKNOWN_ERROR",
}
