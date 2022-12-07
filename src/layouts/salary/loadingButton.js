import React, { useState } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';

export const LoadingButton = ({ getSingleEmployeeSalary }) => {

    const [loadingState, setLoadingState] = useState({ loading: false, error: false })
    const { loading, error } = loadingState
    return (
        <>
            {loading && <>Loading....</>}
            {error && <>Error</>}
            {!loading && !error && <button
                onClick={() => getSingleEmployeeSalary(setLoadingState)}
            // className={`btn btn-outline-${loading?.error ? 'danger' : 'primary'} w-100`}
            >
                Generate Salary
            </button>}

        </>

    );
}
