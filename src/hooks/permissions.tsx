import { useGetAccountPermissionsQuery } from "../apis/accountApi";


export const useHasPermission = (permissionKey: string | string[]) => {
    const { data, isLoading } = useGetAccountPermissionsQuery();

    const hasPermission = (): boolean => {
        if (isLoading) {
            return false;
        }
        if (Array.isArray(permissionKey)) {
            for (let key of permissionKey) {
                if (data!.permissions.includes(key)) {
                    return false;
                }
            }
            return true;
        }
        return data!.permissions.includes(permissionKey);
    }
    return { isLoading, hasPermission };
}


export const useHasAnyPermission = (permissionKey: string | string[]) => {
    const { data, isLoading } = useGetAccountPermissionsQuery();

    const hasAnyPermission = (): boolean => {
        if (isLoading) {
            return false;
        }
        if (Array.isArray(permissionKey)) {
            for (let key of permissionKey) {
                if (data!.permissions.includes(key)) {
                    return true;
                }
            }
            return false;
        }
        return data!.permissions.includes(permissionKey);
    }

    return { isLoading, hasAnyPermission };
}