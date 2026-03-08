/**
 * Lấy giá trị field theo ngôn ngữ hiện tại.
 * Nếu lng === "en" và field _en có dữ liệu → trả về _en
 * Nếu _en không có dữ liệu → fallback về _vn
 * Nếu lng === "vi" → trả về _vn
 */
export function getLocalizedField(
  item: any,
  fieldName: string,
  lng: string
): string {
  if (lng === "en") {
    const enValue = item[`${fieldName}_en`];
    if (enValue) return enValue;
  }
  return item[`${fieldName}_vn`] || "";
}
