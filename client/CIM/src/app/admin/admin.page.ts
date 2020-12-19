import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../services/auth-service.service";
import * as $ from 'jquery';
import * as d3 from "d3";
import { TimelineMax } from "gsap";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, AfterViewInit  {
  unapproved:[];
  constructor(authServiceService:AuthServiceService) { 
    this.getUnapproved()
  }

  ngAfterViewInit() {
    console.log("After");
    $(".approve-btn").on("click", function(){
      var wrapper = $(this).parent().parent();
      var container = $(this).parent().parent().parent();
      
      wrapper.children().each(function(){
        var x = $(this);
        console.log(x);
    
        var tl = new TimelineMax({repeat:0, yoyo:true});
        tl.to(x, 0.3, {scale: 1, transformOrigin:"50% 50%"})
          .to(x, 0.25, {scaleX: 0, scaleY: 0.3, transformOrigin:"50% 50%"})
      });
    
      setTimeout(function(){
         foldAirplane(container);
      }, 300);
    
      setTimeout(function(){
        var sail = new TimelineMax({repeat:0, yoyo:true});
        sail.to(container, 0.2, {top: 30})
          .to(container, 0.2, {top: (-container.height()-550)})
          .to(container, 0.2, {width: 0, margin: 0, padding: 0})
          .to(container, 0.2, {display: "none"});
      }, 1200);
    });
    
    $(".reject-btn").on("click", function(){
      var wrapper = $(this).parent().parent();
      var container = $(this).parent().parent().parent();
    
      wrapper.children().each(function(){
        var x = $(this);
    
        var tl = new TimelineMax({repeat:0, yoyo:true});
        tl.to(x, 0.3, {scale: 1, transformOrigin:"50% 50%"})
          .to(x, 0.25, {scale: 0, transformOrigin:"50% 50%"})
      });
    
      setTimeout(function(){
        crumple(container);
      }, 300);
      
      setTimeout(function(){
        var sail = new TimelineMax({repeat:0, yoyo:true});
        sail.to(container, 0.2, {top: -30})
          .to(container, 0.2, {top: (container.height()+550)})
          .to(container, 0.2, {width: 0, margin: 0, padding: 0})
          .to(container, 0.2, {display: "none"});
      }, 800);
    
    });
    
    function foldAirplane(x) {
      
      var plane = d3.select(x.find("#airplane")[0]);
      var page = d3.select(x.find('#page')[0]);
      var fold_line = d3.select(x.find('#fold_line')[0]);
      
      var r_fold1 = d3.select(x.find('#fold1_right')[0]);
      var r_fold2 = d3.select(x.find('#fold2_right')[0]);
      
      var l_fold1 = d3.select(x.find('#fold1_left')[0]);
      var l_fold2 = d3.select(x.find('#fold2_left')[0]);
    
      // STEP 1
      page
        .transition()
        .duration(200)
        .attr("points", "205.498,247.801 102.749,247.801 0,247.801 0,123.9 0,105.096 0,0 102.749,0 102.749,105.096 205.498,105.096 205.498,123.9");
      
      // STEP 2
      page
        .transition()
        .delay(100)
        .duration(200)
        .attr("points", "205.498,247.801 102.749,247.801 0,247.801 0,123.9 0,105.096 102.749,105.096 102.749,0 102.749,105.096 205.498,105.096 205.498,123.9");
      
      // STEP 3
      page
        .transition()
        .delay(200)
        .duration(200)
        .attr("points", "205.498,247.801 102.749,247.801 0,247.801 0,123.9 0,105.096 102.749,105.096 102.749,0 102.749,105.096 102.749,146.852 102.749,146.852");
      r_fold1
        .transition()
        .delay(200)
        .duration(200)
        .attr("points", "102.749,146.852 102.749,105.096 102.749,0 102.749,146.852");
      
      // STEP 4
      page
        .transition()
        .delay(300)
        .duration(200)
        .attr("points", "205.498,247.801 102.749,247.801 0,247.801 102.749,146.852 102.749,146.852 102.749,105.096 102.749,0 102.749,105.096 102.749,146.852 102.749,146.852");
      fold_line
        .transition()
        .delay(300)
        .duration(200)
        .attr("points", "102.749,146.852 102.749,0 102.749,0");
      l_fold1
        .transition()
        .delay(300)
        .duration(200)
        .attr("points", "102.749,105.096 102.749,146.852 102.749,146.852 102.749,0");
      
      // STEP 5
      page
        .transition()
        .delay(500)
        .duration(200)
        .attr("points", "181.499,247.801 102.749,229.134 23.999,247.801 102.749,146.852 102.749,146.852 102.749,105.096 102.749,0 102.749,105.096 102.749,146.852 102.749,146.852");
      fold_line
        .transition()
        .delay(450)
        .duration(200)
        .attr("points", "102.749,229.134 102.749,0 102.749,0");
      r_fold2
        .transition()
        .delay(500)
        .duration(200)
        .attr("points", "181.499,247.801 102.749,0 102.749,146.852");
      l_fold2
        .transition()
        .delay(500)
        .duration(200)
        .attr("points", "23.999,247.801 102.749,0 102.749,146.852");
    }
    
    function crumple(x){
      var plane = d3.select(x.find("#airplane")[0]);
      var page = d3.select(x.find('#page')[0]);
      var fold_line = d3.select(x.find('#fold_line')[0]);
    
      var r_fold1 = d3.select(x.find('#fold1_right')[0]);
      var r_fold2 = d3.select(x.find('#fold2_right')[0]);
    
      var l_fold1 = d3.select(x.find('#fold1_left')[0]);
      var l_fold2 = d3.select(x.find('#fold2_left')[0]);
    
      // STEP 1
      page
        .transition()
        .duration(500)
        .attr("points", "125.742,159.625 69.5,169.25 80.992,134.5 49.992,141.375 49.242,109.125 156.992,143.625 146.617,79.875 70.617,109.375 154.827,130.321 156.992,143.625");
      fold_line
        .transition()
        .duration(50)
        .attr("display", "none");
      r_fold1
        .transition()
        .duration(500)
        .attr("points", "91.492,156.593 163.758,104.578 91.992,69.125 91.492,156.593");
      r_fold2
        .transition()
        .duration(500)
        .attr("points", "153.75,163.75 118.992,67.625 43.992,96.625");
      l_fold1
        .transition()
        .duration(500)
        .attr("points", "91.492,114.837 91.492,156.593 54.242,138.375 62.992,92.375");
      l_fold2
        .transition()
        .duration(500)
        .attr("points", "56.5,156.593 77.242,67.625 125.742,159.625");
    }
  }

  ngOnInit() {
    console.log("Onit");
    
   
  }

  getUnapproved(){
    // this.AuthServiceService.getApprovalRequest().subscribe(data =>{
    //   console.log("Unapproved: ");
      
    //   console.log(data);
      
    // });    
  }

}
