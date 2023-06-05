export const HEADER_HEIGHT = "100px";
export const LEFT_SIDEBAR_WIDTH = "240px";

export enum CreateNFTStep {
  IDLE,
  UPLOADING_METADATA,
  UPLOADED_METADATA,
  CREATING_NFT,
  CREATED_NFT,
}

export const CreateNFTStepDescription = {
  [CreateNFTStep.IDLE]: "Idle",
  [CreateNFTStep.UPLOADING_METADATA]: "Uploading metadata...",
  [CreateNFTStep.UPLOADED_METADATA]: "Uploaded metadata!",
  [CreateNFTStep.CREATING_NFT]: "Creating NFT...",
  [CreateNFTStep.CREATED_NFT]: "Created NFT!",
};

export const SOL_MINT_ADDRESS = "11111111111111111111111111111111";
export enum SaleAPIType {
  CREATE,
  CONFIRM,
}
