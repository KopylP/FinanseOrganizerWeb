﻿// <auto-generated />
using System;
using FinanceOrganizer.web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FinanceOrganizer.web.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190605220950_second")]
    partial class second
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FinanceOrganizer.web.Data.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("DisplayName");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<DateTime>("LastModifiedDate");

                    b.Property<string>("LastName");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(190);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FinanceOrganizer.web.Data.Models.Expense", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Cost");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<bool>("IsComing");

                    b.Property<DateTime>("LastModifiedDate");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(120);

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Expense");
                });

            modelBuilder.Entity("FinanceOrganizer.web.Data.Models.ExpensePosition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Cost");

                    b.Property<string>("ExpenseId")
                        .IsRequired();

                    b.Property<int>("Name");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseId");

                    b.ToTable("ExpensePosition");
                });

            modelBuilder.Entity("FinanceOrganizer.web.Data.Models.MonthLimit", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ApplicationUserId");

                    b.Property<double>("Limit");

                    b.Property<int>("Month");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.Property<int>("Year");

                    b.HasKey("id");

                    b.HasIndex("ApplicationUserId");

                    b.ToTable("Limits");
                });

            modelBuilder.Entity("FinanceOrganizer.web.Data.Models.Expense", b =>
                {
                    b.HasOne("FinanceOrganizer.web.Data.Models.ApplicationUser", "ApplicationUser")
                        .WithMany("Expenses")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("FinanceOrganizer.web.Data.Models.ExpensePosition", b =>
                {
                    b.HasOne("FinanceOrganizer.web.Data.Models.Expense", "Expense")
                        .WithMany("ExpensePositions")
                        .HasForeignKey("ExpenseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FinanceOrganizer.web.Data.Models.MonthLimit", b =>
                {
                    b.HasOne("FinanceOrganizer.web.Data.Models.ApplicationUser", "ApplicationUser")
                        .WithMany("MonthLimits")
                        .HasForeignKey("ApplicationUserId");
                });
#pragma warning restore 612, 618
        }
    }
}