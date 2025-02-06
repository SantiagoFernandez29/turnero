export interface AreaButtonDto {
    title: string;
    onClick: () => void;
    isLoading: boolean;
    style?: React.CSSProperties;
}