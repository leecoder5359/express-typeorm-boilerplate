export function mapper<T, U>(sourceObject: T, targetObject: new () => U): U {
    const target = new targetObject();

    const dtoKeys = Object.keys((sourceObject as any));
    for (const key of dtoKeys) {
        (target as any)[key] = (sourceObject as any)[key];
    }

    return target;
}