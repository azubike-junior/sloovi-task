export interface ItemProp {
  last: string;
  company_id: string;
  created: string;
  company_datas: [];
  is_first: string;
  icon: string;
  invited_by: string;
  is_creator: string;
  is_delete: string;
  is_archived: string;
  phone: string;
  user_id: string;
  is_shared: string;
  name: string;
  modified_by: string;
  modified: string;
  currency: string;
  company: string;
  id: string;
  first: string;
  email: string;
  status: string;
  user_status: string;
  role_id: string;
  role_name: string;
}

export interface SelectProps {
  name: string;
  type: string;
  child?: string;
  className?: string;
  label: string;
  icon?: JSX.Element;
  onChange?: any;
  placeholder?: string;
  value?: string;
  toggleUpdate?: boolean;
  user_id?: string;
  options?: [];
};

export interface InputProps {
  name: string;
  type: string;
  child?: string;
  className?: string;
  label: string;
  icon?: JSX.Element;
  onChange?: any;
  placeholder?: string;
  value?: string;
  toggleUpdate?: boolean;
};
