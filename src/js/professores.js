window.api.receive("fromMain", (data) => {
    console.log(`Received ${data} from main process`);
});



function create(...args) {
    
    window.api.send("toMain", args);
}