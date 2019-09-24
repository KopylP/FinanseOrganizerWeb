import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from "@angular/core";
import * as D3 from "d3"
import { BarDataModel } from "../../interfaces/BarDataModel";
import { ChartService } from "../../services/chart.service";

let xScale, yScale, height;

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements AfterViewInit, OnInit {

  @ViewChild("containerBarChart") element: ElementRef;

  private host: D3.Selection;
  private svg: D3.Selection;
  private barGroup: D3.Selection;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private margin = 50;
  private data: BarDataModel[];
  private htmlElement: HTMLElement;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
  }

  private buildSvg(): void {

    this.svg = this.host.append("svg")
      .attr("width", 600)
      .attr("height", 600);
    this.width = this.svg.attr("width") - this.margin;
    height = this.height = this.svg.attr("height") - this.margin;
  }

  private buildAxises(): void {
    this.xScale = D3.scaleBand().domain(this.data.map(d => d.CreatedDate)).range([0, this.width]).paddingInner(0.1);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.barGroup = this.svg.append("g").attr('transform', `translate(${25}, ${25})`);
    const max = D3.max(this.data, (d) => Math.abs(d.Cost));
    this.yScale.domain([0, max]);
    this.barGroup.append("g").call(D3.axisLeft(this.yScale));
    xScale = this.xScale;
    yScale = this.yScale;
  }


  private createBar(): void {
    this.barGroup
      .selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      .on("mouseover", this.onMouseOver)
      .on("mouseout", this.onMouseOut)
      .attr('fill', "red")
      .attr('x', (d) => this.xScale(d.CreatedDate))
      .attr('y', (d) => this.yScale(d.Cost))
      .attr('width', (d) => this.xScale.bandwidth())
      .transition()     // adds animation
      .duration(400)
      .ease(D3.easeLinear)
      .delay(function (d, i) {
        return i * 50;
      })
      .attr('height', (d) => this.height - this.yScale(d.Cost));
    this.barGroup
      .selectAll(".tick")
      .append("line")
      .attr("stroke", "#e8e8e8")
      .attr("x1", 0)
      .attr('y1', 0)
      .attr("x2", this.width)
      .attr('y2', 0);
  }

  onMouseOver(d: BarDataModel, i: number): void  {
    D3.select(this).attr('class', 'highlight');
    D3.select(this)
      .transition()     // adds animation
      .duration(400)
      .attr('width', xScale.bandwidth() + 5)
      .attr("y", function (d) { return yScale(d.Cost) - 10; })
      .attr("height", function (d) { return height - yScale(d.Cost) + 10; });
  }

  onMouseOut(d, i) {
      // use the text label class to remove label on mouseout
      D3.select(this).attr('class', 'bar');
      D3.select(this)
        .transition()     // adds animation
        .duration(400)
        .attr('width', xScale.bandwidth())
        .attr("y", function (d) { return yScale(d.Cost); })
        .attr("height", function (d) { return height - yScale(d.Cost); });
      D3.selectAll('.val')
        .remove()
}

  loadData(): void {
    this.chartService.getExpenseBarData("", "").subscribe(res => {
      this.data = res;
      this.buildSvg();
      this.buildAxises();
      this.createBar();
    });
  }

}
