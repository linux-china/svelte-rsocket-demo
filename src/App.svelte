<script>
    export let name;
    let rsocketRequestCounter = 0;
    let response = "";
    import {rsocket} from "./rsocket-client"

    async function handlerClick() {
        response = await rsocket.requestResponse("demo.service", "HI")
        rsocketRequestCounter = rsocketRequestCounter + 1;
    }
</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>Hello {name}!</h1>


<button on:click={handlerClick}>RSocket RPC</button>

<h3>Response({rsocketRequestCounter}): {response}</h3>
