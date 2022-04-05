export const getMetadataUploadMessageToSign = (txHash: string, metadata: string): string => {
    return `Sign metadata to be uploaded \n txHash ${txHash} \n metadata ${metadata}`;
};