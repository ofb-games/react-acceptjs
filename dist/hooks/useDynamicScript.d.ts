/**
 * `useDynamicScript()` is similar to `useScript()` - the key difference
 * being `useDynamicScript()` will remove the `<script>` tag from the DOM
 * before the component is removed.
 */
declare function useDynamicScript(url: string, async?: boolean, appendToHeadOrBody?: 'head' | 'body'): boolean[];
export default useDynamicScript;
