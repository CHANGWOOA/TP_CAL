const sessionCheck= () => {

}

const getMessage = (msg, url) => {
    return `<script>
            alert('${msg}');
            location.href = '${url}';
            </script>`;
}


module.exports = {getMessage}