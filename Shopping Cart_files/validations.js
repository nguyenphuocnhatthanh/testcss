Validation.add(
    'validate-person-name',
    'This is not allowed special characters and required at least 2 characters.',
    function(v) {
        return /^[^!@#$%^&*()-=<>":\\]*$/.test(v) && (v.trim().length >= 2);
    }
);
