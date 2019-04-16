export interface LotItemData {
  plate: string;
  parking_time: Date;
  has_paid?: boolean;
}

export interface LotItem extends LotItemData {
  id: string;
}
