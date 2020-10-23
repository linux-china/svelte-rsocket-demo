<script>
    import {observe} from 'svelte-observable';
    import {interval} from 'rxjs';
    import {take} from 'rxjs/operators';

    export let name;
    let rsocketRequestCounter = 0;
    let response = "";
    import {rsocket} from "./rsocket-client"

    async function handlerClick() {
        response = await rsocket.requestResponse("echo.service", "Ping")
        rsocketRequestCounter = rsocketRequestCounter + 1;
    }
    // svelte-observable with RxJS
    const takeFourNumbers = interval(1000).pipe(take(10));
    const results_store = observe(takeFourNumbers);
</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>Hello {name}!</h1>


<button on:click={handlerClick}>RSocket RPC</button>

<h3>Response({rsocketRequestCounter}): {response}</h3>

<h3>Svelte Observable</h3>

{#await $results_store}
    pending - waiting for value from upstream
{:then result}
    fulfilled - Received: {result}
{:catch error}
    rejected - Received an error
{/await}
