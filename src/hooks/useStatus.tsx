import { useState } from 'react';

function useStatus() {
    const [loading, setLoadingStatus] = useState<boolean>(false); 

    const loadingStatus = () => {
        setLoadingStatus(false)
    }

    const completeStatus = () => {
        setLoadingStatus(true)
    }

    return [loading, loadingStatus, completeStatus]
}

export default useStatus