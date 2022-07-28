window.onload = function() {
    // custom config
    var default_link_length = 16.67;
    var nominal_stroke = 1;
    var default_node_color = d3.scale.category20();
    var default_node_stroke = "rgb(255, 255, 255, 1.0)";
    var default_node_focus = "rgb(255, 255, 0, 1.0)";
    var default_link_color = "rgb(0, 0, 0, 1.0)";
    var default_link_opacity = "0.5";
    var highlight_color = "rgb(255, 0, 0, 1.0)";
    var highlight_trans = 0.1;
    var min_zoom = 1.0;
    var max_zoom = 2.8;
    var charge = 40;
    var node_scale_number = 0.8;
    var link_scale_number = 0.2;
    var gravity = 0.3;

    // app config
    var w = window.innerWidth;
    var h = window.innerHeight;
    var focus_node = null, highlight_node = null;
    var outline = false;
    var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom]);
    var query = document.getElementById('query');
    var searchBar = document.getElementById('myInput');
    var nameList = document.getElementById('myUL');
    var force = d3.layout.force()
        .gravity(gravity)
        .linkDistance(default_link_length)
        .charge(-charge)
        .size([w,h]);

    function drawGraph(graph) {
        var svg = d3.select("#force").append("svg");
        var g = svg.append("g");
        svg.style("cursor","move");

        var linkedByIndex = {};
        graph.links.forEach(function(d) {
            linkedByIndex[d.source + "," + d.target] = true;
        });

        function isConnected(a, b) {
            return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        }

        function hasConnections(a) {
            for (var property in linkedByIndex) {
                s = property.split(",");
                if ((s[0] == a.index || s[1] == a.index) && linkedByIndex[property]) return true;
            }
            return false;
        }

        force.nodes(graph.nodes).links(graph.links).start();

        var link = g.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .style("stroke", default_link_color)
            .attr("class", "link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
            .style("stroke-width", function(d, i) {
                return d.value * (charge * link_scale_number) + "px";
            })
            .style("opacity", default_link_opacity);
//            .style("stroke-dasharray", function(d, i) {
//                return (d.value <= 1) ? "2, 2" : "none";
//            });


        var node = g.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag)

        node.on("dblclick.zoom", function(d) {
            d3.event.stopPropagation();
            var dcx = (window.innerWidth / 2 - d.x * zoom.scale());
            var dcy = (window.innerHeight / 2 - d.y * zoom.scale());
            zoom.translate([dcx, dcy]);
            g.attr("transform", "translate("+ dcx + "," + dcy  + ")scale(" + zoom.scale() + ")");
        });

        var tocolor = "fill";
        var towhite = "stroke";
        if (outline) {
            tocolor = "stroke"
            towhite = "fill"
        }

        drawLegend(graph.nodes, graph.links.length, default_node_color, default_node_stroke, tocolor, towhite, nominal_stroke);

        var circle = node.append("path")
            .attr("d", d3.svg.symbol()
            .size(function(d) { return Math.PI * Math.pow(d.size * (charge * node_scale_number), 2); })
            .type(function(d) { return d.type; }))
            .style(tocolor, function(d, i) { return default_node_color(d.group); })
            .style("stroke-width", nominal_stroke)
            .style(towhite, default_node_stroke);

        node.on("mouseover", function(d) {
            set_highlight(d);
        });
        node.on("mouseout", function(d) {
		    exit_highlight();
		});
        node.on("click", function(d) {
            d3.event.stopPropagation();
            focus_node = d;
            // remove <td> in table
            remove_rows();
            set_focus(d);
            document.body.style.overflowY = "auto";
            set_highlight(d);
            query.style.visibility = "visible";
        });

        d3.select(window).on("click", function() {
            if (focus_node!==null) {
                focus_node = null;
                if (highlight_trans < 1) {
                    circle.style("opacity", 1);
                    circle.style("fill", function(d, i) { return default_node_color(d.group) });
                    link.style("opacity", default_link_opacity);
                }
            }
            exit_highlight();
            // remove <td> in table
            remove_rows();
            document.body.style.overflowY = "hidden";
            query.style.visibility = "hidden";
            nameList.style.visibility = 'hidden';
            searchBar.value = '';
        });

        d3.select("#mySlider").on("input", inputted);

        function inputted() {
            force.linkDistance(default_link_length * (1.0 + this.value / 100.0));
            force.charge(-charge * (1.0 + this.value / 100.0));
            force.start();
        }

        function remove_rows() {
            while (query.childNodes.length > 2) {
                query.removeChild(query.lastChild);
            }
        }

        function exit_highlight() {
            highlight_node = null;
            if (focus_node===null) {
                svg.style("cursor","move");
                if (highlight_color != default_node_stroke) {
                    circle.style(towhite, default_node_stroke);
                    link.style("stroke", default_link_color);
                }
            }
        }

        function append_record(rows) {
            for (var j=0; j<rows.length; j++) {
                var parenttbl = document.createElement('tr');
                for (var i = 0; i < rows[j].length; i++) {
                    var newel = document.createElement('td');
                    newel.innerHTML = rows[j][i];
                    parenttbl.appendChild(newel);
                }
                query.appendChild(parenttbl);
            }
        }

        function set_focus(d) {
            if (highlight_trans < 1) {
                var rows = new Set();
                rows.add([d.name, 'self', d.description, d.biname]);
                circle.style("opacity", function(o) {
                    if (isConnected(d, o) && d.name !== o.name) {
                        rows.add([o.name, 'neighbor', o.description, o.biname]);
                    }
                    return isConnected(d, o) ? 1 : highlight_trans;
                });
                circle.style("fill", function(o) {
                    if (d.name !== o.name) {
                        return default_node_color(o.group);
                    } else {
                        return default_node_focus;
                    }
                });
                link.style("opacity", function(o) {
                    return o.source.index == d.index || o.target.index == d.index ? default_link_opacity : highlight_trans;
                });
                append_record(Array.from(rows));
            }
        }

        function set_highlight(d) {
            svg.style("cursor", "pointer");
            if (focus_node!==null) d = focus_node;
            if (highlight_color != default_node_stroke) {
                circle.style(towhite, function(o) {
                    return isConnected(d, o) ? highlight_color : default_node_stroke;
                });
                link.style("stroke", function(o) {
                    return o.source.index == d.index || o.target.index == d.index ? highlight_color : default_link_color;
                });
            }
        }

        graph.nodes.forEach(function(d, i) {
            var item = document.createElement('li');
            item.innerHTML = d.name;
            nameList.append(item);
            item.addEventListener('click', function() {
                searchBar.value = this.innerText;
                nameList.style.visibility = 'hidden';
                searchBar.onkeydown = searchNode(d);
            });
        });

        searchBar.onkeyup = function() {
            nameList.style.visibility = 'visible';
            var filter = searchBar.value.toUpperCase();
            var li = nameList.getElementsByTagName('li');
            // Loop through all list items, and hide those who don't match the search query
            for (var i = 0; i < li.length; i++) {
                txtValue = li[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }

        function searchNode(d) {
            if (highlight_trans < 1) {
                circle.style("opacity", function(o) {
                    if (d.name !== o.name) {
                        return highlight_trans;
                    } else {
                        return 1;
                    }
                });
                link.style("opacity", function(o) {
                    return o.source.index == d.index || o.target.index == d.index ? default_link_opacity : highlight_trans;
                });
            }
        }

        zoom.on("zoom", function() {
            link.style("stroke-width", function(d) { return d.value * (charge * link_scale_number); });
            circle.style("stroke-width", nominal_stroke);
            circle.attr("d", d3.svg.symbol().size(function(d) {
                    return Math.PI * Math.pow(d.size * (charge * node_scale_number), 2);
                }).type(function(d) {
                        return d.type;
                    })
            )
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        });
        svg.call(zoom);
        resize();
        d3.select(window).on("resize", resize).on("keydown", keydown);
        force.on("tick", ticked);

        function ticked() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }

        function resize() {
            var width = window.innerWidth, height = window.innerHeight;
            svg.attr("width", width).attr("height", height);
            force.size([force.size()[0]+(width-w)/zoom.scale(),force.size()[1]+(height-h)/zoom.scale()]).resume();
            w = width;
            h = height;
        }

        function keydown() {
            if (d3.event.keyCode==32) {
                force.stop();
            } else {
                if (highlight_node !== null) {
                    if ((key0||hasConnections(highlight_node))) {
                        if (focus_node!==null) set_focus(focus_node);
                        set_highlight(highlight_node);
                    } else {
                        exit_highlight();
                    }
                }
            }
        }
    }

    d3.json("./data/network_protein_0d5.json", drawGraph);
    // Add drop menu
    var drop_menu = document.getElementById("drop")
    drop_menu.addEventListener("change", function(e) {
        d3.selectAll("#force svg").remove();
        nameList.innerHTML = '';
        searchBar.value = '';
        if(e.target.value == "a") {
            d3.json("./data/network_protein_0d5.json", drawGraph);
        }
        if(e.target.value == "b") {
            d3.json("./data/network_protein_0d45.json", drawGraph);
        }
        if(e.target.value == "c") {
            d3.json("./data/network_protein_0d4.json", drawGraph);
        }
        if(e.target.value == "d") {
            d3.json("./data/network_protein_0d35.json", drawGraph);
        }
        if(e.target.value == "e") {
            d3.json("./data/network_protein_0d3.json", drawGraph);
        }
    });
}

// Draw legend
function drawLegend(nodes, link_length, color, stroke, tocolor, towhite, nominal_stroke) {
    var total = document.getElementById('total');
    total.innerHTML = "Total Proteins: " + nodes.length + "<br>Total Links: " + link_length
    d3.selectAll('#side svg').remove()
    var set1 = new Set()
    for (var i = 0; i < nodes.length; i++) {
        set1.add(nodes[i].group)
    }
    var groups = Array.from(set1)
    var longest = groups.sort(function (a, b) { return b.length - a.length; })[0];
    var legend_width = 7.5;
    var legend_height = 25;
    var legend_radius = 10;
    var legend_offset = 10;
    var legend_top_spacing = 10;
    var legend_text_left_spacing = 30;
    var legend_text_font_size = "15px";
    var legend_area_width = legend_width * longest.length;
    var legend_area_height = legend_height * groups.length;
    var lgd = d3.select("#side").append("svg")
            .attr("width", legend_area_width + legend_offset)
            .attr("height", legend_area_height + legend_offset)
            .attr("float", "left");
    for (var i = 0; i < groups.sort().length; i++) {
        lgd.append("circle")
            .attr("cx",legend_radius + legend_offset)
            .attr("cy",legend_top_spacing + legend_offset)
            .attr("r", legend_radius)
            .style(tocolor, color(groups[i]))
            .style(towhite, stroke)
            .style("stroke-width", nominal_stroke)
        lgd.append("text")
            .attr("x", legend_text_left_spacing + legend_offset)
            .attr("y", legend_top_spacing + legend_offset + 1)
            .attr("alignment-baseline","middle")
            .text(function() {
                if (groups[i] == 'nan') {
                    return 'unknown';
                } else {
                    return groups[i]
                }
            })
            .style("font-size", legend_text_font_size)
        legend_top_spacing += legend_height
    }
}
