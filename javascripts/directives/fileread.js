"use strict";
app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    console.log("loadEvent", loadEvent);
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        console.log("fileread", scope.fileread);
                    });
                    
                };
                console.log("change", changeEvent);
               reader.fileName = changeEvent.target.files[0].name;
                reader.date = changeEvent.target.files[0].lastModified;
                console.log("reader", reader);
                reader.readAsDataURL(changeEvent.target.files[0]);
                console.log("reader URL", reader);
            });
        }
    };
}]);