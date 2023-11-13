export const checkUserPayload = (userInfo: any) => {
  if (userInfo.email) {
    throw new Error("Mauvais paramètre envoyé");
  }
};
