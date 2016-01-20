Form = React.createClass({
    
    // render :: a -> ReactElement
    render: function(){
        self = this;
        return <MultiSelect
            
            values = {this.state.tags}
            
            // restoreOnBackspace :: Item -> String
            restoreOnBackspace = {function(item){
                return item.label;
            }}

            // onValuesChange :: [Item] -> (a -> Void) -> Void
            onValuesChange = {function(tags, callback){
                self.setState({tags: tags}, callback);
            }}
            
            // createFromSearch :: [Item] -> [Item] -> String -> Item?
            createFromSearch = {function(options, values, search){
                labels = values.map(function(value){ 
                    return value.label; 
                })
                if (search.trim().length == 0 || labels.indexOf(search.trim()) != -1) 
                    return null;
                return {label: search.trim(), value: search.trim()};
            }}
            
            // renderNoResultsFound :: [Item] -> String -> ReactElement
            renderNoResultsFound = {function(values, search) {
                return <div className = "no-results-found">
                    {(function(){
                        if (search.trim().length == 0)
                            return "Type a few characters to create a tag";
                        else if (values.map(function(value){ return value.label; }).indexOf(search) != -1)
                            return "Tag already exists";
                    })()}
                </div>
            }}
        />;
    },
    
    //getInitialState :: a -> UIState
    getInitialState: function(){
        return {tags: ["react", "d3"].map(function(str){
            return {label: str, value: str};
        })};
    }
        
});

render(<Form/>, mountNode); 