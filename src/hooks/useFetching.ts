import {useState} from "react";

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            const error = e as Error;
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError("");

    return [fetching, isLoading, error, clearError] as const;
}

