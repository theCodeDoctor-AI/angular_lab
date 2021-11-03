// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start() 
    {        
        console.log('Testing live refresh');

        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (e) => {
                if(!confirm("Are you sure you want to delete?")) {
                    e.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
        }
    }

    window.addEventListener('load', Start);

})();