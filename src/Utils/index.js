export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const {userRoles} = currentUser;
    return (userRoles.includes('admin')) ;

}